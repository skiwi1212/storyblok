// server/api/submit-form.post.js
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, firstName, lastName, page_slug } = body;

    console.log('Received form submission:', { email, firstName, lastName, page_slug });

    // Default audience and test type
    let audience = 'GENERAL_ADULT';
    let testType = 'GENERAL_ADULT';

    // Parse the slug segments
    if (page_slug?.startsWith('freebies/')) {
      const segments = page_slug.replace('freebies/', '').split('-');

      if (segments[0] === 'kids') {
        audience = 'GENERAL_CHILD';
      }

      const testTypes = {
        'ielts': 'IELTS',
        'pet': 'PET',
        'ket': 'KET',
        'fce': 'FCE',
        'cae': 'CAE',
        'toefl': 'TOEFL',
        'duolingo': 'DUOLINGO',
      };
      testType = testTypes[segments[1]] || audience;
    }

    console.log('Detected segments:', { slug: page_slug, audience, testType });

    // Get audience token from environment variables
    const audienceTokens = {
      'IELTS': process.env.NUXT_ENV_EMAILIT_IELTS_TOKEN,
      'PET': process.env.NUXT_ENV_EMAILIT_PET_TOKEN,
      'KET': process.env.NUXT_ENV_EMAILIT_KET_TOKEN,
      'FCE': process.env.NUXT_ENV_EMAILIT_FCE_TOKEN,
      'CAE': process.env.NUXT_ENV_EMAILIT_CAE_TOKEN,
      'TOEFL': process.env.NUXT_ENV_EMAILIT_TOEFL_TOKEN,
      'DUOLINGO': process.env.NUXT_ENV_EMAILIT_DUOLINGO_TOKEN,
      'GENERAL_ADULT': process.env.NUXT_ENV_EMAILIT_GENERAL_ADULT_TOKEN,
      'GENERAL_CHILD': process.env.NUXT_ENV_EMAILIT_GENERAL_CHILD_TOKEN,
    };

    const audienceToken = audienceTokens[testType] || process.env.NUXT_ENV_EMAILIT_DEFAULT_TOKEN;

    if (!audienceToken) {
      throw new Error(`No token found for audience type: ${testType}`);
    }

    // Construct API URL
    const apiUrl = `${process.env.NUXT_ENV_EMAILIT_API_BASE_URL}/subscribe/${audienceToken}`;
    console.log('API URL:', apiUrl);

    // Make the API request
    const emailitResponse = await $fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NUXT_ENV_EMAILIT_API_KEY}`, // Add Bearer token
      },
      body: {
        email: email,
        first_name: firstName || '',
        last_name: lastName || '',
        custom_fields: {
          source_page: page_slug,
        },
      },
    });

    console.log('EmailIt API response:', emailitResponse);

    return {
      success: true,
      message: `Form submitted successfully for ${email} from page ${page_slug}`,
    };
  } catch (error) {
    console.error('Form submission error:', error.message);

    // Handle specific error cases
    if (error.response?.status >= 400 && error.response?.status < 500) {
      return {
        success: false,
        error: `Client error: ${error.response?.status} - ${error.response?.data?.message || error.message}`,
      };
    } else if (error.response?.status >= 500) {
      return {
        success: false,
        error: 'Server error. Please try again later.',
      };
    }

    // Fallback for unexpected errors
    return {
      success: false,
      error: error.message || 'An unexpected error occurred.',
    };
  }
});
