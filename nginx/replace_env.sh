#/bin/bash
sed -i 's/fusio\///g' /usr/share/index.html > /usr/share/nginx/html/index.html
envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html
