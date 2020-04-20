release:
	npm run build

pi-deploy:
	ssh pi@raspberrypi.local 'sudo rm -rf /var/www/html'
	ssh pi@raspberrypi.local 'sudo rm -rf /home/pi/Projects/kinohub-ui'

	ssh pi@raspberrypi.local 'sudo mkdir -p /var/www/html'
	ssh pi@raspberrypi.local 'mkdir -p /home/pi/Projects/kinohub-ui'
	scp -r dist/* pi@raspberrypi.local:/home/pi/Projects/kinohub-ui
	ssh pi@raspberrypi.local 'sudo cp -R /home/pi/Projects/kinohub-ui/* /var/www/html/'

