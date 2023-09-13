pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: "2"))
        disableConcurrentBuilds()  
    }   
    agent any
    tools {
        nodejs "node"
    }
    stages {
        stage('NPM Install') {
            steps {
                withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                //milestone()
                sh 'npm run build'
            }
        }
        stage('Build docker image') {
            steps {
                //milestone()
                sh 'docker build -t agatalba/tfm-mca-filemanagement-angular:1.0.0  .'
            }
        }
    }
}