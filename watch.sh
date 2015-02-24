#!/bin/sh

echo "Preparing to watch styles.scss"

sass --watch css/sass/styles.scss:css/styles.css --style expanded