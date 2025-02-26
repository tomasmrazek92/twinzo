import { hideNav, revealNav } from './utils/globalFunctions';

let menuOpen = false;
let openClass = 'open';

$(document).on('click', function (event) {
  if (!$(event.target).closest('.nav_ham, .nav_menu').length) {
    if (menuOpen) {
      openMenu();
    }
  }
});

$('.nav_ham').on('click', function (event) {
  event.stopPropagation();
  openMenu();
});

const openMenu = () => {
  if ($(window).width() < 992) {
    if (!menuOpen) {
      $('.nav').addClass('open');
    } else {
      $('.nav').removeClass('open');
    }
    menuOpen = !menuOpen;
  }
};

function checkNav() {
  var scroll = $(window).scrollTop();

  if (!menuOpen) {
    if ($('.nav').attr('data-nav-home') !== 'true') {
      if (scroll >= 100 && !$('.nav').hasClass('fixed')) {
        $('.nav').addClass('fixed');
      } else if (scroll === 0) {
        $('.nav').removeClass('fixed');
      }
    }
  }
}

$(window).scroll(checkNav);
checkNav();

// #region scrollDisabler
$('[scroll="disable"]').on('click', function () {
  if (typeof lenis !== 'undefined') {
    lenis.stop();
  } else {
    $('html').addClass('no-scroll');
  }
});

$('[scroll="enable"]').on('click', function () {
  if (typeof lenis !== 'undefined') {
    lenis.start();
  } else {
    $('html').removeClass('no-scroll');
  }
});

// #endregion

// #region Countries
$(document).ready(function () {
  $('select[name="country"').each(function () {
    const selectElement = $(this);
    function createCountryOptions(countries) {
      return countries.map((country) => {
        const option = document.createElement('option');
        option.value = country.Name;
        option.textContent = country.Name;
        option.setAttribute('data-code', country.Code);
        return option;
      });
    }
    const countryOptions = createCountryOptions(countries);
    countryOptions.forEach((option) => selectElement.append(option));
  });
});
// #endregion

// #region Tracking
$(document).ready(function () {
  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Function to handle successful form submission
  function handleFormSuccess(event, eventName) {
    // Prevent handling the event multiple times
    if (event.preventDefault) {
      event.preventDefault();
    }

    // Push the event to dataLayer
    window.dataLayer.push({
      event: eventName,
    });
  }

  // Find all forms with data-tracking-submit attribute
  const trackingForms = $('form[data-tracking-submit]');

  // Add success event listener to each form
  trackingForms.each(function () {
    const $form = $(this);
    const eventName = $form.attr('data-tracking-submit');

    // Check if form has Webflow form binding
    if (Webflow && Webflow.push) {
      Webflow.push(function () {
        $form.on('submit', function (e) {
          handleFormSuccess(e, eventName);
        });
      });
    } else {
      console.warn('Webflow form binding not found');
    }
  });
});
// #endregion

// #region forms
$(document).ready(function () {
  const formProtection = {
    // Suspicious patterns for additional security
    suspiciousPatterns: [
      /\d{8,}/, // Sequences of 8 or more numbers
      /[a-zA-Z0-9]+\d{4,}@/, // Letters followed by 4+ numbers before @
      /(.)\1{4,}/, // Same character repeated 5+ times
      /[^a-zA-Z0-9.@_-]/, // Special characters that shouldn't be in emails
    ],

    // Rate limiting implementation
    rateLimiting: {
      submissions: new Map(),
      maxAttempts: 5,
      timeWindow: 300000, // 5 minutes in milliseconds

      check: function (formId) {
        const now = Date.now();
        const attempts = this.submissions.get(formId) || [];

        // Clean up old attempts
        const recentAttempts = attempts.filter((time) => now - time < this.timeWindow);

        if (recentAttempts.length >= this.maxAttempts) {
          return false;
        }

        recentAttempts.push(now);
        this.submissions.set(formId, recentAttempts);
        return true;
      },
    },

    // Enhanced validation methods
    validation: {
      isValidEmail: function (email) {
        // Basic email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return false;

        const lowerEmail = email.toLowerCase();

        // Check blocked domains from Webflow configuration
        const blockedDomains = window.blockedEmailDomains || [];
        if (blockedDomains.some((domain) => lowerEmail.includes(domain.toLowerCase()))) {
          return false;
        }

        // Check suspicious patterns
        if (formProtection.suspiciousPatterns.some((pattern) => pattern.test(lowerEmail))) {
          return false;
        }

        return true;
      },

      checkHoneypot: function (form) {
        const honeypots = $(form).find('.honeypot, [name*="honey"], #input-roles');
        return !honeypots.toArray().some((pot) => $(pot).val().trim() !== '');
      },
    },

    // Initialize protection on a form
    init: function (formSelector) {
      const $forms = $(formSelector);

      $forms.each(function () {
        const $form = $(this);
        const formId = $form.attr('id') || Math.random().toString(36).substr(2, 9);
        const $emailInput = $form.find('input[type="email"]');
        const $submitButton = $form.find('input[type="submit"], button[type="submit"]');
        const $messageElement = $form.find('.input-validation');

        // Style initialization
        $messageElement.removeAttr('style').removeClass('display-message');
        $submitButton.removeClass('deactivated');

        // Trigger initial validation on page load
        $emailInput.trigger('input');

        // Add hidden honeypot field if it doesn't exist
        if (!$form.find('.honeypot').length) {
          $form.append('<input type="text" class="honeypot" style="display:none" tabindex="-1">');
        }

        // Email input validation
        $emailInput.on('input blur', function () {
          const email = $(this).val();
          const isValid = email.length > 0 && formProtection.validation.isValidEmail(email);

          // Enable button only if email is valid
          $submitButton.prop('disabled', !isValid);
          $submitButton.toggleClass('deactivated', !isValid);

          // Toggle error states
          $emailInput.toggleClass('invalid-input', !isValid && email.length > 0);
          $messageElement.toggleClass('show', !isValid && email.length > 0);

          console.log('Email validation:', {
            email,
            isValid,
            buttonDisabled: $submitButton.prop('disabled'),
          });
        });

        // Instead of blocking all submits, we'll only handle our specific validation path
        // via the button click, and let other libraries work normally

        // Only validate and process submissions through button click
        $submitButton.on('click', function (e) {
          // Don't prevent default yet - only if our validation fails

          // Perform all validations
          const email = $emailInput.val();
          const isValidEmail = email.length > 0 && formProtection.validation.isValidEmail(email);
          const isHoneypotClean = formProtection.validation.checkHoneypot($form);
          const isUnderRateLimit = formProtection.rateLimiting.check(formId);

          // Log validation state
          console.log('Submission attempt:', {
            isValidEmail,
            isHoneypotClean,
            isUnderRateLimit,
            email,
          });

          // Only block submission if validation fails
          if (!(isValidEmail && isHoneypotClean && isUnderRateLimit)) {
            e.preventDefault();

            // Handle invalid submission
            if (!isUnderRateLimit) {
              $messageElement.text('Too many attempts. Please try again later.');
            } else if (!isHoneypotClean) {
              $messageElement.text('Invalid submission detected.');
            } else {
              $messageElement.text('Please enter a valid business email address.');
            }

            $submitButton.prop('disabled', true).addClass('deactivated');
            $emailInput.addClass('invalid-input');
            $messageElement.addClass('show');
            return false;
          }

          // If we reach here, validation passed, let the form submit naturally
          return true;
        });

        // We'll still block direct Enter key submissions for security
        $form.on('keypress', function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            // Instead of blocking all Enter presses, check if validation would pass
            const email = $emailInput.val();
            const isValidEmail = email.length > 0 && formProtection.validation.isValidEmail(email);

            if (!isValidEmail) {
              e.preventDefault();
              return false;
            }
          }
        });
      });
    },
  };

  // Initialize protection on all forms
  formProtection.init('form');
});
// #endregion
