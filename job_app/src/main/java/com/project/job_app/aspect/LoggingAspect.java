package com.project.job_app.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    // return type, class-name.method-name(args)

    // we can use execution(* *.*(..)) for all the mehthods of all return types and all args, we use(..) for args

    @Before("execution(* com.project.job_app.controller.JobController.*(..))")
     public void logMethodCall(){
         LOGGER.info("Method call");
     }
    @Before("execution(* com.project.job_app.controller.JobController.*(..))")
     public void logMethodCall(JoinPoint jp){
         LOGGER.info("Method call" + jp.getSignature().getName());
     }
}
