#/bin/bash
envsubst < /usr/share/index.html > /usr/share/nginx/html/index.html
sed -i 's/fusio\///g' /usr/share/nginx/html/index.html
