import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Retrieves the Google Analytics ID from environment variables.
 * The ID should be defined in your environment configuration for the application.
 */
const googleAnalyticsId: string | undefined = process.env.GOOGLE_ANALYTICS_ID;

/**
 * If the Google Analytics ID is defined, the following script tags are created
 * and appended to the document's head to integrate Google Analytics into the application.
 */
if (googleAnalyticsId) {
    // Create a script element for loading the Google Analytics library asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);

    // Create another script element to configure Google Analytics with the specified ID
    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
    `;
    document.head.appendChild(script2);
} else {
    // Log an error message if the Google Analytics ID is not defined
    console.error('Google Analytics ID is not defined.');
}

/**
 * Bootstraps the Angular application using the AppComponent and the app configuration.
 * This is where the Angular app starts executing.
 */
bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));