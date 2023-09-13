properties(
    [
        [$class: 'BuildDiscarderProperty', strategy:
          [$class: 'LogRotator', artifactDaysToKeepStr: '3', artifactNumToKeepStr: '5', daysToKeepStr: '30', numToKeepStr: '60']],
        pipelineTriggers(
          [
              pollSCM('H/10 * * * *'),
              cron('@daily'),
          ]
        )
    ]
)
node {
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