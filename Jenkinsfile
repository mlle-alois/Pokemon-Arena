def testSuccess = false
pipeline {
    agent any



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
                        testSuccess = false
                    }
                }

                failure {
                    script {
                        testSuccess = true
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
                withSonarQubeEnv(installationName: 'sonar-scan') {
                  sh """${scannerHome}/bin/sonar-scanner"""
                }
            }
        }
    }
}
