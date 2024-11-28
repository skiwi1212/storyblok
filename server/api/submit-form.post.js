export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, page_slug } = body;

    console.log('Received form submission:', { email, page_slug });

    // Initialize segment data with defaults
    let audience = 'ADULT';
    let testType = 'NO_TEST';
    let skillFocus = 'GENERAL';

    // Parse the slug segments
    if (page_slug.startsWith('freebies/')) {
      // Remove 'freebies/' and split the remaining path
      const segments = page_slug.replace('freebies/', '').split('-');
      
      // Map audience
      if (segments[0] === 'kids') {
        audience = 'CHILD';
      }

      // Map test type
      const testTypes = {
        'notest': 'NO_TEST',
        'ielts': 'IELTS',
        'pet': 'PET',
        'ket': 'KET',
        'fce': 'FCE',
        'cae': 'CAE',
        'toefl': 'TOEFL',
        'duolingo': 'DUOLINGO'
      };
      testType = testTypes[segments[1]] || 'NO_TEST';

      // Map skill focus
      const skills = {
        'speaking': 'SPEAKING',
        'listening': 'LISTENING',
        'reading': 'READING',
        'writing': 'WRITING',
        'general': 'GENERAL'
      };
      skillFocus = skills[segments[2]] || 'GENERAL';
    }

    // Create combined segment identifier
    const segment = `${audience}_${testType}_${skillFocus}`;

    console.log('Detected segments:', {
      slug: page_slug,
      audience,
      testType,
      skillFocus,
      segment
    });

    const emailData = {
      from: 'Sean <sean@luenglish.com>',
      to: email,
      subject: 'Welcome to LU English!',
      html: `<h1>Thank you for joining us!</h1>
             <p>We're excited to help you improve your English skills.</p>`,
      headers: {
        'X-Lead-Source': page_slug,
        'X-Lead-Segment': segment,
        'X-Audience': audience,
        'X-Test-Type': testType,
        'X-Skill-Focus': skillFocus
      },
      metadata: {
        source_page: page_slug,
        segment: segment,
        audience: audience,
        test_type: testType,
        skill_focus: skillFocus,
        signup_date: new Date().toISOString()
      }
    };

    const response = await $fetch('https://api.emailit.com/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer em_qKuRKS1TkRZ4vgbpfWB1O3xgAlj3cv35`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    return {
      success: true,
      message: `Form submitted successfully for ${email} from page ${page_slug}`
    };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email'
    };
  }
});