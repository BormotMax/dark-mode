const tableName = "HireMeInfo-ujq2qtcuuzfa5ks77rcn6se6cu-int"

export const getHireMeInfoById = (id) => {
	return `aws dynamodb get-item --table-name ${tableName} --key '{"freelancerID": { "S": "${id}" }}'`
}

export const deleteHireMeInfoById = (id) => {
	return `aws dynamodb delete-item --table-name ${tableName} --key '{"freelancerID": { "S": "${id}" }}'`
}
