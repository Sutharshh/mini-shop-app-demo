pipeline {
    agent any

    stages {
        // Stage 1: Get code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Stage 2: Install dependencies and test backend
        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        // Stage 3: Build frontend and backend Docker images
        stage('Build Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-token',
                        usernameVariable: 'sutharsh30',
                        passwordVariable: 'dckr_pat_WK2-kVkk7TKBhIQpiPWpjUPBw9I'
                    )
                ]) {
                    bat '''
                        docker build -t "sutharsh30/mini-shop-backend:latest" ./backend
                        docker build -t "sutharsh30/mini-shop-frontend:latest" ./frontend
                    '''
                }
            }
        }

        // Stage 4: Push images to Docker Hub
        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-token',
                        usernameVariable: 'sutharsh30',
                        passwordVariable: 'dckr_pat_WK2-kVkk7TKBhIQpiPWpjUPBw9I'
                    )
                ]) {
                    bat '''
                        @echo off
                        docker login -u "sutharsh30" --password-stdin < nul
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Mini Shop pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins Console Output.'
        }
    }
}
