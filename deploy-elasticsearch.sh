# in an instance

git clone https://github.com/teabolt/dcu_project_search_elasticsearch.git
cd dcu_project_search_elasticsearch

git pull

npm install --production
node bulk-prepare.js

bash bootstrap.sh

years=("2020" "2019" "2018" "2017" "2016" "2015" "2014" "2013" "2012" "2011")
for year in ${years[@]}; do
  bash bulk-index.sh bulk-data/$year.txt
done
