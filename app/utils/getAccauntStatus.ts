const getAccountStatus = async (data) => {
  const res = await fetch(`https://api.green-api.com/waInstance${data.id}/getStateInstance/${data.api}
  `)
}