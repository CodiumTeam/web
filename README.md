# Launch the web
make up

# Recreate all the webs
make build

# Install dependencies
make build

# Pages

http://localhost:8000/index.php

http://localhost:8000/curso-tdd.php

http://localhost:8000/curso-legacy-code.php

http://localhost:8000/curso-docker.php

# Configure PHPStorm + Symfony plugin
To enable "Ctrl+click" and navigate on code like: ```{{ include('components/block_header.html.twig'...``` follow these steps:

1. Install Symfony plugin + restart PHPStorm
1. Go to: Preferences -> PHP -> Symfony
1. Check: "Enable plugin for this project" + restart again

