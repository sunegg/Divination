#import <Foundation/Foundation.h>

@interface DeviceUtils : NSObject

+ (NSString *)getIDFAString;

+ (NSString *)getIDFVString;

+(NSString *)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;

@end
