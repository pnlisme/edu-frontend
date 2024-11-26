export const handleAPIError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message
  }
  return 'Something went wrong'
}
