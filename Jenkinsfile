def testSuccess = false
pipeline {
  agent any

  triggers {
    githubPush()
  }
  ///Test pour trigger 2
  stages {
    stage('Build') {
      steps {
        // Get some code from a GitHub repository
        git branch: 'main', credentialsId: 'github-token-final', url: 'https://github.com/mlle-alois/Pokemon-Arena'
      }
    }

    stage('Test') {
      steps {

        // ng test
        sh "npm install"
        sh "npm run-script test"

      }

      post {
        // Enregistre les résultats des tests dans un rapport disponible sur jenkins
        always {
          junit checksName: 'Jest Tests', testResults: 'junit.xml'
        }

        success {
          script {
            testSuccess = true
          }
        }

        failure {
          //Envoi un mail de notification
          emailext attachmentsPattern: 'junit.xml', attachLog: true, body: 'les tests sont cassés', recipientProviders: [brokenTestsSuspects()], subject: 'test failure', to: 'amedouillard@gmail.com;ichtitski@gmail.com;alois.zimmermann45@gmail.com'

          script {
            testSuccess = false
          }
        }
      }
    }

    stage('Analyse Sonar') {
      environment {
        scannerHome = tool 'sonar-scan';
      }

      when {
        expression {
          testSuccess
        }
      }

      steps {
        withSonarQubeEnv(installationName: 'Instance sonar', credentialsId: 'Test-sonarqube') {
          sh """${scannerHome}/bin/sonar-scanner"""
        }
      }
    }

    stage('Heroku Deploy') {
      when {
        expression {
          testSuccess
        }
      }

      steps {
        withEnv(['HEROKU=/snap/bin/']) {
          withCredentials([usernamePassword(credentialsId: 'heroku-apikey', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
            sh('git push https://${USERNAME}:${PASSWORD}@git.heroku.com/pokemon-arena-ic.git HEAD:refs/heads/main')
          }
        }
      }

        post {
          // Enregistre les résultats des tests dans un rapport disponible sur jenkins
          always {
            emailext attachLog: true, body: 'Déploiement sur Heroku réussi', recipientProviders: [brokenTestsSuspects()], subject: 'Déploiement réussi', to: 'amedouillard@gmail.com;alois.zimmermann45@gmail.com;ichtitski@gmail.com'
          }

        }

    }

  }
}
