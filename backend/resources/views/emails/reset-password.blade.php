<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Verificación</title>
</head>
<body>
    <section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header>
        </header>

        <main class="mt-8">
            <h2 class="text-gray-700 dark:text-gray-200">Hola</h2>

            <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                Este es tu código de verificación:
            </p>

            <div class="flex items-center mt-4 gap-x-4">
                    <p class="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400 ">{{ $verificationCode }}</p>

            </div>

            <p class="mt-4 leading-loose text-gray-600 dark:text-gray-300">
                Este código será válido solo durante los próximos 5 minutos. Si el código no funciona, puedes usar este enlace de verificación de inicio de sesión:
            </p>
            
            <a href="/" class="px-6 py-2 mt-6 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Restablecer contraseña</a>
        </main>
        

        <footer class="mt-8">
            <p class="text-gray-500 dark:text-gray-400">
                Este correo electrónico se envió a <a href="#" class="text-blue-600 hover:underline dark:text-blue-400" target="_blank">contacto@wetube.com</a>. 
                Si prefieres no recibir este tipo de correos electrónicos, puedes <a href="#" class="text-blue-600 hover:underline dark:text-blue-400">cancelar la suscripción</a> o <a href="#" class="text-blue-600 hover:underline dark:text-blue-400">administrar tus preferencias de correo electrónico</a>.
            </p>

            <p class="mt-3 text-gray-500 dark:text-gray-400"> {{ date('Y') }} WeTube. Todos los derechos reservados.</p>
        </footer>
    </section>
</body>
</html>
