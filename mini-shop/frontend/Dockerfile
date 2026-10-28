
# Use the official Nginx web server image.
FROM nginx:alpine

# Copy the website files into Nginx's web directory.
COPY public/ /usr/share/nginx/html/

# Replace the default Nginx configuration.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The frontend listens on port 80 inside its container.
EXPOSE 80
