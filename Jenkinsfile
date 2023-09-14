pipeline {
    environment {
        NAMESPACE = "agat-prog"
        DEPLOY = "true"
        REGISTRY = 'agatalba/tfm-mca-filemanagement-angular'
        VERSION = 1.0.1
    }

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
                sh 'docker build -t agatalba/tfm-mca-filemanagement-angular:${VERSION} .'
            }         
        }
        stage('Push docker image') {
            steps {
            	withCredentials([usernamePassword(credentialsId: 'dockerhub-user', passwordVariable: 'pass', usernameVariable: 'user')]) {
            		sh 'docker login -u ${user} -p ${pass}'
                    sh 'docker push agatalba/tfm-mca-filemanagement-angular:${VERSION}'
            	}            
            }
        } 
        stage('Deploy into Kubernetes') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }          
            agent {
                docker {
                    image 'dtzar/helm-kubectl'
                    args  '-u root -v /home/agat/.kube:/root/.kube'
                }
            }  
            steps {
                sh "helm upgrade -n ${NAMESPACE} -f helm/values.yaml --set namespace=${NAMESPACE} --set image.tag='${VERSION}' angular-release helm/"
            }
        }                 
    }
}