WebSocket example for OpenShift
===============================

This is WebSocket example ported from https://github.com/heroku-examples/node-ws-test to OpenShift.

Setup
-----

Follow instructions
on https://developers.openshift.com/getting-started/debian-ubuntu.html
to install OpenShift Client Tools (rhc command)

Or use these commands (Ubuntu 14.04.3 LTS, AWS: `us-east-1 32-bit ebs ami-6f8b2604 t1.micro` - as of May 2016 the cost was about $0.0035/hr in us-east-1d):

```shell
sudo apt-get update
sudo apt-get install ruby-full build-essential git npm nodejs
sudo gem install rhc
```

> NOTE: On same versions of Ubuntu there is missing link node -> nodejs.
> In such case try:

```shell
sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
```

For the 1st time run:
```shell
rhc setup
# confirm hostname openshift.redhat.com <ENTER>
# enter your OpenShift Login and password
# confirm token creation
# confirm upload of ssh key
```

Then create directory for openshift projects:

```shell
mkdir -p ~/projects/openshift
```
Change working directory there

```shell
cd ~/projects/openshift
```

Create OpenShift NodeJs application from my GitHub repo using this command:
```shell
rhc app-create wsexample nodejs-0.10  --from-code https://github.com/hpaluch/websocket-openshift.git
```

> NOTE: If you exceeded OpenShift's limit for
> free apps (max 3 apps) you can use this command
> to delete extra app:

```shell
rhc apps # show apps
rhc app delete APP_NAME
```

Your application should be successfully deployed on url like
`http://wsexample-YOUR_DOMAIN_PREFIX.rhcloud.com`

Development and Redeployment
---------------------------
* Just enter `wsexample` subdirectory and edit what needed
* for the 1st time or after packages.json change issue
```shell
npm install
```
* issue this command to run application locally
```shell
npm start
```
* open url http://localhost:5000 in your browser
* to redeploy modified app to OpenShift use:
```shell
git add .
git commit -m "My modification"
git push origin master
```




