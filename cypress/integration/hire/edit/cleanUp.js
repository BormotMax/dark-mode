const tableName = "HireMeInfo-vvznszcvpjgy7cgqbtnayenskm-master"

// uncomment next line to run test against test environment
// const tableName = "HireMeInfo-2p5zncsasjacbm5cs5udwv22xe-test"

export const getHireMeInfoById = (id) => {
	return `aws dynamodb get-item --table-name ${tableName} --key '{"freelancerID": { "S": "${id}" }}'`
}

export const deleteHireMeInfoById = (id) => {
	return `aws dynamodb delete-item --table-name ${tableName} --key '{"freelancerID": { "S": "${id}" }}'`
}
