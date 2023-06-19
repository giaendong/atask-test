export type CommonErrorCodeType = {
  documentation_url: string;
  errors: {
    code: string;
    field: string;
    message: string;
    resource: string;
  }[]
  message: string;
}