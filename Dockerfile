# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
#FROM node:latest as build

# Set the working directory
#WORKDIR /usr/local/app

# Add the source code to app
#COPY ./ /usr/local/app/

# Install all the dependencies
#RUN npm install

# Generate the build of the application
#RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
#COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/mca-filesmanagement-angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Creación de la imagen
#https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/
#docker build -t agatalba/tfm-mca-filemanagement-angular:1.0.0  .
#docker run --name angular -d -p 80:80 agatalba/tfm-mca-filemanagement-angular:1.0.0