package com.drbaltar.mealplanserver.Controllers;

public class MissingArgumentsException extends RuntimeException {
    public MissingArgumentsException(String message) {
        super(message);
    }
}
