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
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            sh 'npm install'
        }
    }

    stage('Build') {
        milestone()
        sh 'ng build'
    }

    stage('Deploy') {
        milestone()
        echo "Deploying..."
    }
}