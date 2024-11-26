export const SendError = (msg: string, data?: any) => {
  return Response.json({
    ok: false,
    msg,
    data
  })
}

export const SendSuccess = (msg: string, data?: any) => {
  return Response.json({
    ok: true,
    msg,
    data
  })
}
