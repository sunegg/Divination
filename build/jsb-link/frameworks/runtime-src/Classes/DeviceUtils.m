#import "DeviceUtils.h"
#import <AdSupport/ASIdentifierManager.h>

@implementation DeviceUtils


+ (NSString *)getIDFAString
{
    NSString *adId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    return adId;
}

+ (NSString *)getIDFVString
{
    NSString *idfv = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    return idfv;
}

+(NSString *)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
 // UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
  //[alertView show];
  return @"test";
}

@end
