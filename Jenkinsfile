node {
  stage('SCM') {
    checkout scm
  }
   stage('Test') {
      steps {

          // ng test
          sh "npm install"
          sh "npm run-script test"

      }

      post {
          // Enregistre le résultat des tests dans un fichier accessible sur Jenkins
          always {
              junit checksName: 'Jest Tests', testResults: 'junit.xml'
          }
      }
   }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scan';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
