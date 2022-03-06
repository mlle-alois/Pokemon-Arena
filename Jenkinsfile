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
                    script {
                        testSuccess = false
                    }
                }
            }
        }

        stage('Analyse Sonar'){
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

        stage('Heroku Deploy'){
            when {
                expression {
                    testSuccess
                }
            }

            steps {
                withEnv(['HEROKU=C:\\Progra~1\\heroku\\bin']){
                withCredentials([usernamePassword(credentialsId:'heroku-apikey', usernameVariable:'USR', passwordVariable:'PWD')])
                sh "$HEROKU\\heroku git:remote -a pokemon-arena-ic"
                sh "git push --force heroku main"
            }
        }

    }
}
