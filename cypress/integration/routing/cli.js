// master
const userPoolId = "us-east-1_ZVr3K6ZFF"
const username = "01f98123-4834-4fe2-8b9a-43172a2846e6"

export const removeUserFromGroup = (group) =>
	`aws cognito-idp admin-remove-user-from-group --user-pool-id ${userPoolId} --username ${username} --group-name ${group}`

export const addUserToGroup = (group) =>
	`aws cognito-idp admin-add-user-to-group --user-pool-id ${userPoolId} --username ${username} --group-name ${group}`
