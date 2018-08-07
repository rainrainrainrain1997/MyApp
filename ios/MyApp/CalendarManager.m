//
//  CalendarManager.m
//  MyApp
//
//  Created by rain on 2018/8/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

// To export a module named CalendarManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSDate *)date)
{
  // Date is ready to use!
  RCTLogInfo(@"Pretending to create an event %@ at %@ on %@", name, location,date);
  
}

@end

