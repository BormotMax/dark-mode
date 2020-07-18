const tableName = "HireMeInfo-vvznszcvpjgy7cgqbtnayenskm-master"

// uncomment next line to run test against test environment
// const tableName = "HireMeInfo-2p5zncsasjacbm5cs5udwv22xe-test"

export const getHireMeInfoByFreelancer = (user) => {
	return `aws dynamodb query \
--table-name ${tableName} \
--index-name 'byFreelancer' \
--key-condition-expression 'freelancerID = :a' \
--expression-attribute-values '{":a": {"S": "${user.username}"}}'`
}

export const deleteHireMeInfoById = (id) => {
	return `aws dynamodb delete-item --table-name ${tableName} --key '{"id": { "S": "${id}" }}'`
}
