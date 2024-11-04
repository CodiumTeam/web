# Install dependencies
make install

# Dev Start front-end server
make up

# Pages

http://localhost:8000/

http://localhost:8000/curso-tdd.html

http://localhost:8000/curso-legacy-code.html

http://localhost:8000/curso-docker.html


## QA

Where I should put the images to access?

If the image is referenced in code. Vite will copy in dist/assets at build process.

In case where the image is not referenced in html/css/js. Put in in public/ folder. Vite will copy all content in that directory to dist at build process.
