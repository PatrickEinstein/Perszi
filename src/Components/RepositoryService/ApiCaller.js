// const url = "http://54.87.238.126" //TEST
// const url = "http://54.160.95.148"; //LIVE
const url = "http://54.90.169.200"

const HttpCaller = async (route, Method, body, headers) => {
  console.log(`env`,url);
  try {
    const savedUserResponse = await fetch(`${url}/${route}`, {
      method: `${Method}`,
      body: JSON.stringify(body),
      headers: headers,
    });

    if (!savedUserResponse.ok) {
      const errorData = await savedUserResponse.text();
      throw new Error(errorData);
    }

    const responseData = await savedUserResponse.json();
    // const Res = JSON.parse(responseData);
    return responseData;
  } catch (err) {
    return err;
  }
};

export default HttpCaller;
