@echo on

echo COPY TO SERVER SAPIP MOBILE APP

scp -r dist root@bigoo.mx:/home/sapip/client

pause
exit