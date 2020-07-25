const userPoolId = "us-east-1_NCYyF5Tdx"
const username = "809af606-cee7-42b6-8686-0eba19bb3f72"

export const removeUserFromGroup = (group) =>
	`aws cognito-idp admin-remove-user-from-group --user-pool-id ${userPoolId} --username ${username} --group-name ${group}`

export const addUserToGroup = (group) =>
	`aws cognito-idp admin-add-user-to-group --user-pool-id ${userPoolId} --username ${username} --group-name ${group}`
