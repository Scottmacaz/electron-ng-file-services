using System;
using System.Collections.Generic;

namespace net_server.Domain
{
    public class Protocol
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public List<Step> Steps {get; set;}
    }
}
