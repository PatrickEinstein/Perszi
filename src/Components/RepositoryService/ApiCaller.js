const HttpCaller = async (route, Method, body, headers) => {
  try {
    const savedUserResponse = await fetch(
      `http://54.87.238.126/${route}`,
      {
        method: `${Method}`,
        body: JSON.stringify(body),
        headers: headers,
      }
    );

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
