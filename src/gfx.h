#ifndef _AMINOGFX_H
#define _AMINOGFX_H

#define INVALID_TEXTURE 0
#define INVALID_PROGRAM 0

/*
 * Platform specific headers.
 *
 * Current time in milliseconds.
 */

#ifdef MAC

//macOS
#include <GLFW/glfw3.h>
#include <stdlib.h>
#include <sys/time.h>

//return the current time in msec
static double getTime(void) {
    timeval time;

    gettimeofday(&time, NULL);

    double millis = (time.tv_sec * 1000.0) + (time.tv_usec / 1000.0);

    return millis;
}

#endif

#ifdef LINUX

#include <GL/glfw.h>
#include <GL/glext.h>
#include <sys/time.h>

//return the current time in msec
static double getTime(void) {
    timeval time;

    gettimeofday(&time, NULL);

    double millis = (time.tv_sec * 1000.0) + (time.tv_usec / 1000.0);

    return millis;
}

#endif

#ifdef RPI

#include <EGL/egl.h>
#include <EGL/eglext.h>

#include "GLES2/gl2.h"
#include "GLES2/gl2ext.h"

#include <time.h>

//return the current time in msec
static double getTime(void) {
    struct timespec res;

    clock_gettime(CLOCK_REALTIME, &res);

    return 1000.0 * res.tv_sec + ((double) res.tv_nsec / 1e6);
}

#endif

#endif
