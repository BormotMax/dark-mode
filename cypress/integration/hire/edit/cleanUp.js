export const cleanup = `
aws dynamodb query \
--table-name HireMeInfo-vvznszcvpjgy7cgqbtnayenskm-master \
--index-name 'byFreelancer' \
--key-condition-expression 'freelancerID = :a' \
--expression-attribute-values '{":a": {"S": "01f98123-4834-4fe2-8b9a-43172a2846e6"}}' | \
jq -r '.Items[0].id.S' | \
xargs -I % aws dynamodb delete-item --table-name HireMeInfo-vvznszcvpjgy7cgqbtnayenskm-master --key '{"id": { "S": "%" }}'`
