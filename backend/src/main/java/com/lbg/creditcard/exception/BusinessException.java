package com.lbg.creditcard.exception;

public class BusinessException extends RuntimeException{
    public BusinessException(String Message){
        super(Message);
    }
}
