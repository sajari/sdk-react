export const pipeline1 = {
  account: 'test.account',
  collection: 'test.collection',
  endpoint: 'test.endpoint',
  name: 'pipeline.name',
};

export const customConfigPipeline = {
  ...pipeline1,
  clickTokenURL: 'https://example.com',
  userAgent: 'test-user-agent',
};
