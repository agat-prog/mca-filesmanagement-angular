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
                milestone()
                sh 'ng build'
            }
        }
        stage('Deploy') {
            steps {
                milestone()
                echo "Deploying..."
            }
        }
    }
}