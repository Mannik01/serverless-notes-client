export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "mandips-note-app"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://s9xjjscqxc.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_KQwPvtvf1",
    APP_CLIENT_ID: "33n8713gtsvc8jc52pkpvp2uqa",
    IDENTITY_POOL_ID: "us-east-2:28a7e0b0-bbb6-4f50-9b66-8e94f234e622"
  }
};
