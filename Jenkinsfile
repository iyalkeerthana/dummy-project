pipeline {
    agent any

    stages {
        stage('Install OWASP Dependency-Check') {
            steps {
                // Install Dependency-Check CLI
                sh '''
                mkdir -p dependency-check
                cd dependency-check
                curl -L https://github.com/jeremylong/DependencyCheck/releases/download/v8.2.1/dependency-check-8.2.1-release.zip -o dependency-check.zip
              	unzip -o dependency-check.zip
                chmod +x dependency-check/bin/dependency-check.sh
		ls -la
		ls -la dependency-check/bin/
		cat dependency-check/bin/dependency-check.sh
		dos2unix dependency-check/bin/dependency-check.sh || true
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                // Example: Install Node.js dependencies
                sh 'npm install'
            }
        }
        stage('Run OWASP Dependency-Check') {
            steps {
                // Run the Dependency-Check scan
                sh '''
                sh /var/jenkins_home/workspace/test-project/dependency-check/bin/dependency-check.sh \
                --project "test-project" --scan /var/jenkins_home/workspace/test-project/test-project \
                --format "HTML" --out /var/jenkins_home/workspace/test-project/dependency-check-report
                '''
            }
        }
    }

    post {
        always {
            // Archive the Dependency-Check report
            archiveArtifacts 'dependency-check-report/dependency-check-report.html'
        }
    }
}

