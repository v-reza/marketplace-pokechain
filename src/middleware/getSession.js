const getSession = async (ctx) => {
  const { req, res } = ctx;
  const isAuth = req.cookies?.isAuth;

  if (Boolean(!isAuth) || !isAuth) {
    return {
      props: {
        isAuth: false,
      },
    };
  }
  return {
    props: {
      isAuth: true,
    },
  };
};

export default getSession;
