# Lumen+ReactJS+Webpack+SASS

## Overview
Reditto is a simple web app that talks to Reddit API and displays posts for `Hot`and `New` categories by utilizing the tech stack listed above. It was created as a homework assignment from a job interview but could easily be leveraged as boilerplate by those who are looking for working configuration for the particular stack above. It can be helpful for projects moving from traditional `LAMP` stack to more modern stack.

![alt text](https://raw.githubusercontent.com/murnun/redditto/master/screenshot.png)

# Installation Instruction

## Prerequisite
- PHP >= 5.6.4
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Composer
- Nodejs/NPM
- Docker [optional]

In addition, I highly recommend using `LaraDock` for Docker containerization.

Documentation: http://laradock.io/documentation/<br />
Github: https://github.com/laradock/laradock

Setup is super quick and highly configurable!


## Steps

Once you have `LaraDock` running or copied this codebase to your existing PHP environment, please take following steps to complete the installation:

1. Update your `hosts` file to add `redditto.app` domain. (Otherwise, Reddit API won't work)
2. Create a copy of `.env.example` and name it `.env`: `cp .env.example .env`
3. Alternatively, I have included `.env` file with appropriate configuration in the `.zip` package
4. Install `composer` dependencies: `composer install`
5. Create & set new app key for Lumen app: `php artisan key:generate`
6. Install `node` dependencies: `npm install`


**You should be all set, open up your browser & go to: http://redditto.app**<br />

**If any questions, just let me know. I'd be happy to walk through.**
