/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });

  const tableName = process.env.TABLE_NAME;
  const region = process.env.REGION;

  aws.config.update({ region: region });

  const group = 'FREELANCER';

  if (event.request.userAttributes.sub) {
    let date = new Date();

    // -- Write data to DDB
    let ddbParams = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: 'User' },
        owner: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        role: { S: 'FREELANCER' },
      },
      TableName: tableName,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(ddbParams).promise();
      console.log('Success');
    } catch (err) {
      console.log('Error', err);
    }

    const groupParams = {
      GroupName: group,
      UserPoolId: event.userPoolId,
    };

    const addUserParams = {
      GroupName: group,
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };

    try {
      await cognitoidentityserviceprovider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise();
    }

    try {
      await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
      callback(null, event);
    } catch (e) {
      callback(e);
    }
  } else {
    console.log('no email in event');
    callback(null, event);
  }
};
