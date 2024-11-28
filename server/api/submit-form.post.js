export default defineEventHandler(async (event) => {
  try {
    // Get the body data
    const body = await readBody(event)
    const { email, page_slug } = body

    // Log the received data for debugging
    console.log('Received form submission:', { email, page_slug })

    // For testing, just return success
    return { 
      success: true,
      message: `Form submitted successfully for ${email} from page ${page_slug}`
    }

  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
})